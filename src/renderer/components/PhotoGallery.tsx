import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Calendar, Quote } from 'lucide-react'
import type { PhotoMetadata } from 'shared/types'

export function PhotoGallery() {
  const [photos, setPhotos] = useState<PhotoMetadata[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPhotos()
  }, [])

  const loadPhotos = async () => {
    try {
      const response = await fetch('/photos-metadata.json')
      if (!response.ok) {
        throw new Error('Failed to load photos metadata')
      }
      const photosData: PhotoMetadata[] = await response.json()
      setPhotos(photosData)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setLoading(false)
    }
  }

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const goToPhoto = (index: number) => {
    setCurrentIndex(index)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-xl">Loading photos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-red-400">
        <div className="text-xl">Error: {error}</div>
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-gray-400">
        <div className="text-xl">No photos found</div>
      </div>
    )
  }

  const currentPhoto = photos[currentIndex]

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Main photo display */}
      <div className="flex-1 relative flex items-center justify-center p-4">
        {/* Navigation buttons */}
        <button
          onClick={prevPhoto}
          className="absolute left-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextPhoto}
          className="absolute right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Photo */}
        <div className="relative max-w-4xl max-h-full">
          <img
            src={`/photos/${currentPhoto.filename}`}
            alt={currentPhoto.title}
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      </div>

      {/* Photo information */}
      <div className="bg-gray-900/95 p-6 space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">{currentPhoto.title}</h1>
          
          <div className="flex items-center justify-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{currentPhoto.place}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(currentPhoto.date).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-400 italic">
            <Quote className="w-4 h-4" />
            <span>"{currentPhoto.quote}"</span>
          </div>
        </div>

        {/* Thumbnail navigation */}
        <div className="flex justify-center gap-2 pt-4">
          {photos.map((photo, index) => (
            <button
              key={photo.filename}
              onClick={() => goToPhoto(index)}
              className={`w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-teal-400 scale-110'
                  : 'border-gray-600 hover:border-gray-400'
              }`}
            >
              <img
                src={`/photos/${photo.filename}`}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Photo counter */}
        <div className="text-center text-gray-500 text-sm">
          {currentIndex + 1} of {photos.length}
        </div>
      </div>
    </div>
  )
}
