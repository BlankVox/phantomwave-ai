export interface Project {
    id: string
    user_id: string
    title: string
    file_url: string
    file_name: string
    file_size: number
    duration?: number
    status: 'processing' | 'ready'
    created_at: string
    updated_at: string
}

export interface UploadProgress {
    loaded: number
    total: number
    percentage: number
}

export interface UploadResult {
    success: boolean
    file_url?: string
    error?: string
    project?: Project
} 