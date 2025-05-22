'use client'

import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'

const FileUpload = () => {
  const sampleUserId = '2d880f54-3b52-43f3-b1c1-fb03492aa646' // Replace with actual user ID


  const props = useSupabaseUpload({
    bucketName: 'images',
    path: sampleUserId,
    allowedMimeTypes: ['image/*'],
    maxFiles: 10,
    maxFileSize: 1000 * 1000 * 10, // 10MB,
  })

  return (
    <div className="w-[500px]">
      <Dropzone {...props}>
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
    </div>
  )
}

export default FileUpload;