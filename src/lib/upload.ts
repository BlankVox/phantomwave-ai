import { supabase } from './supabase'
import { Project, UploadResult } from '@/types/database'

const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB
const ALLOWED_TYPES = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/mp4']

export class UploadService {
    static validateFile(file: File): string | null {
        if (file.size > MAX_FILE_SIZE) {
            return 'File size must be less than 100MB'
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            return 'Only MP3 and WAV files are supported'
        }

        return null
    }

    static async uploadAudioFile(
        file: File
    ): Promise<UploadResult> {
        try {
            // Validate file
            const validationError = this.validateFile(file)
            if (validationError) {
                return { success: false, error: validationError }
            }

            // Get current user
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                return { success: false, error: 'User not authenticated' }
            }

            // Generate unique filename
            const fileExt = file.name.split('.').pop()
            const fileName = `${user.id}/${Date.now()}.${fileExt}`
            const filePath = `audio/${fileName}`

            // Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from('audio-files')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (error) {
                return { success: false, error: error.message }
            }

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('audio-files')
                .getPublicUrl(filePath)

            return {
                success: true,
                file_url: urlData.publicUrl
            }

        } catch (error) {
            console.error('Upload error:', error)
            return {
                success: false,
                error: 'Upload failed. Please try again.'
            }
        }
    }

    static async createProject(
        title: string,
        fileUrl: string,
        fileName: string,
        fileSize: number
    ): Promise<UploadResult> {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                return { success: false, error: 'User not authenticated' }
            }

            // Insert project record
            const { data: project, error } = await supabase
                .from('projects')
                .insert({
                    user_id: user.id,
                    title: title || fileName,
                    file_url: fileUrl,
                    file_name: fileName,
                    file_size: fileSize,
                    status: 'ready'
                })
                .select()
                .single()

            if (error) {
                return { success: false, error: error.message }
            }

            return { success: true, project }

        } catch (error) {
            console.error('Create project error:', error)
            return {
                success: false,
                error: 'Failed to create project. Please try again.'
            }
        }
    }

    static async getUserProjects(): Promise<Project[]> {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                return []
            }

            const { data: projects, error } = await supabase
                .from('projects')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Fetch projects error:', error)
                return []
            }

            return projects || []

        } catch (error) {
            console.error('Get user projects error:', error)
            return []
        }
    }
} 