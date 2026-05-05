// apps/frontend/components/UploadZone.tsx

'use client'

import React, { useCallback, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { validateVideoFile } from '@/lib/utils'
import { FileVideo, XCircle } from 'lucide-react'

interface UploadZoneProps {
  onFileSelect: (file: File) => void
  isLoading?: boolean
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect, isLoading = false }) => {
  const [isDragActive, setIsDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    setError(null)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      const validation = validateVideoFile(file)
      
      if (!validation.valid) {
        setError(validation.error || 'Invalid file')
      } else {
        onFileSelect(file)
      }
    }
  }, [onFileSelect])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      const file = files[0]
      const validation = validateVideoFile(file)
      
      if (!validation.valid) {
        setError(validation.error || 'Invalid file')
      } else {
        onFileSelect(file)
      }
    }
  }, [onFileSelect])

  return (
    <div>
      <Card
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed transition-all ${
          isDragActive
            ? 'border-pink-500 bg-pink-50'
            : 'border-pink-200 bg-pink-50/30'
        }`}
      >
        <div className="text-center py-12">
          <div className="text-5xl mb-4"><FileVideo size={48} className="text-pink-500" /></div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Upload Your Video
          </h3>
          <p className="text-gray-600 mb-6">
            Drag & drop or click to select (Max 100MB)
          </p>

          <input
            type="file"
            accept="video/mp4,video/quicktime,video/webm"
            onChange={handleInputChange}
            disabled={isLoading}
            className="hidden"
            id="video-input"
          />

          <label htmlFor="video-input" className="inline-block">
            <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-2.5 rounded-lg font-semibold cursor-pointer hover:shadow-lg transition-all hover:scale-105">
              {isLoading ? '⏳ Uploading...' : 'Choose Video'}
            </div>
          </label>

          <p className="text-sm text-gray-500 mt-4">
            MP4, MOV, or WebM • Under 100MB
          </p>
        </div>
      </Card>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-medium"><XCircle size={20} className="text-red-500" /> {error}</p>
        </div>
      )}
    </div>
  )
}