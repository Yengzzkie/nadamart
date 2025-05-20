'use client'

import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'
import { createClient } from '@/lib/supabase/client'
import {  useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

const ImageUploader = () => {
//   const sampleUserId = '2d880f54-3b52-43f3-b1c1-fb03492aa646' // Replace with actual user ID
const supabase = createClient();
  const { userId } = useParams();
  const [media, setMedia] = useState([]);

  const props = useSupabaseUpload({
    bucketName: 'images',
    path: userId,
    allowedMimeTypes: ['image/*'],
    maxFiles: 10,
    maxFileSize: 1000 * 1000 * 10, // 10MB,
  })

  async function getMedia() {
    const { data, error } = await supabase.storage
      .from('images')
      .list(userId + '/', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      })

      if (data) {
        setMedia(data)
      }

    if (error) {
      console.error('Error fetching media:', error)
    } else {
      console.log('Fetched media:', data)
    }
  }

  async function deleteMedia(mediaName) {
    const { error } = await supabase.storage
      .from('images')
      .remove([`${userId}/${mediaName}`])

    if (error) {
      console.error('Error deleting media:', error)
    } else {
      console.log('Deleted media:', mediaName)
      setMedia(media.filter((m) => m.name !== mediaName))
    }
  }

  useEffect(() => {
    getMedia()
    console.log('Media:', media)
  }
  , [userId]);

  return (
    <div className="w-[500px]">
      <Dropzone {...props}>
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>

      {media.map((media) => (
        <div key={media.id}>
            <img src={`https://crtvgenbjflrgxtjpdwz.supabase.co/storage/v1/object/public/images/${userId}/${media.name}`} alt={media.name} className="w-32 h-32 object-cover" />
            <button className='border bg-yellow-500' onClick={() => deleteMedia(media.name)}>Delete Image</button>
        </div>
      ))}
    </div>
  )
}

export default ImageUploader;