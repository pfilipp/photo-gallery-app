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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          prevPhoto()
          break
        case 'ArrowRight':
          event.preventDefault()
          nextPhoto()
          break
        case 'Escape':
          // Could be used to exit fullscreen mode in the future
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [photos.length])

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
        <div className="text-xl animate-pulse">Loading photos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-red-400 space-y-4">
        <div className="text-xl">Error: {error}</div>
        <button 
          onClick={loadPhotos}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
        >
          Retry
        </button>
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
    <div className="h-screen bg-black text-white flex flex-col select-none">
      {/* Main photo display */}
      <div className="flex-1 relative flex items-center justify-center p-4">
        {/* Navigation buttons */}
        <button
          onClick={prevPhoto}
          className="absolute left-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-200 hover:scale-110"
          aria-label="Previous photo (←)"
          title="Previous photo (←)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextPhoto}
          className="absolute right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-200 hover:scale-110"
          aria-label="Next photo (→)"
          title="Next photo (→)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Photo */}
        <div className="relative max-w-4xl max-h-full">
          <img
            src={`/photos/${currentPhoto.filename}`}
            alt={currentPhoto.title}
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/illustration.svg' // Fallback to default illustration
            }}
          />
        </div>
      </div>

      {/* Photo information */}
      <div className="bg-gray-900/95 backdrop-blur-sm p-6 space-y-4 border-t border-gray-800">
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
        <div className="flex justify-center gap-2 pt-4 overflow-x-auto scrollbar-hide">
          {photos.map((photo, index) => (
            <button
              key={photo.filename}
              onClick={() => goToPhoto(index)}
              className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex
                  ? 'border-teal-400 scale-110 shadow-lg shadow-teal-400/30'
                  : 'border-gray-600 hover:border-gray-400 hover:scale-105'
              }`}
              title={photo.title}
            >
              <img
                src={`/photos/${photo.filename}`}
                alt={photo.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/illustration.svg'
                }}
              />
            </button>
          ))}
        </div>

        {/* Photo counter and controls info */}
        <div className="flex justify-between items-center text-gray-500 text-sm">
          <div className="text-center flex-1">
            {currentIndex + 1} of {photos.length}
          </div>
          <div className="text-xs text-gray-600">
            Use ← → keys to navigate
          </div>
        </div>
      </div>
    </div>
  )
}
