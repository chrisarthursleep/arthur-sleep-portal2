import { useState } from 'react'
import { Camera, Upload, Link, Palette, X } from 'lucide-react'
import Button from '@/components/ui/Button'

interface ShareInspirationModalProps {
  onClose: () => void
}

type UploadType = 'photo' | 'link' | 'color'

export default function ShareInspirationModal({ onClose }: ShareInspirationModalProps) {
  const [uploadType, setUploadType] = useState<UploadType | null>(null)
  const [uploadedItems, setUploadedItems] = useState<string[]>([])
  const [linkUrl, setLinkUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleFileUpload = () => {
    // Simulate file upload
    setUploadedItems(prev => [...prev, `Image_${prev.length + 1}.jpg`])
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Palette className="text-purple-600" size={32} />
        </div>
        <p className="text-stone-900 font-medium mb-2">Inspiration Shared!</p>
        <p className="text-stone-600 text-sm">
          Rebecca will review and discuss with you soon
        </p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Palette className="text-purple-600" size={24} />
        </div>
        <h4 className="text-lg font-medium text-stone-800 mb-2">Share Style Inspiration</h4>
        <p className="text-stone-600 text-sm">Upload photos of styles, colours, or materials that inspire you</p>
      </div>

      {/* Upload Options */}
      {!uploadType && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setUploadType('photo')}
            className="p-6 bg-purple-50 border border-purple-200 rounded-2xl hover:bg-purple-100 transition-colors text-center"
          >
            <Camera className="mx-auto mb-2 text-purple-600" size={24} />
            <p className="font-medium text-purple-900 text-sm">Photo</p>
          </button>
          
          <button
            onClick={() => setUploadType('link')}
            className="p-6 bg-blue-50 border border-blue-200 rounded-2xl hover:bg-blue-100 transition-colors text-center"
          >
            <Link className="mx-auto mb-2 text-blue-600" size={24} />
            <p className="font-medium text-blue-900 text-sm">Link</p>
          </button>
          
          <button
            onClick={() => setUploadType('color')}
            className="p-6 bg-green-50 border border-green-200 rounded-2xl hover:bg-green-100 transition-colors text-center"
          >
            <Palette className="mx-auto mb-2 text-green-600" size={24} />
            <p className="font-medium text-green-900 text-sm">Colour</p>
          </button>
        </div>
      )}

      {/* Photo Upload */}
      {uploadType === 'photo' && (
        <div className="mb-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-medium text-stone-800">Upload Photos</h5>
            <button
              onClick={() => setUploadType(null)}
              className="text-amber-600 hover:text-amber-700 text-sm font-medium"
            >
              Change method
            </button>
          </div>
          
          <div className="border-2 border-dashed border-stone-300 rounded-2xl p-8 text-center mb-4">
            <Upload className="mx-auto mb-3 text-stone-400" size={32} />
            <p className="text-stone-600 mb-4">Drag and drop or click to upload</p>
            <Button onClick={handleFileUpload} variant="secondary" size="sm">
              Choose Files
            </Button>
          </div>
          
          {uploadedItems.length > 0 && (
            <div className="space-y-2">
              {uploadedItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                  <span className="text-stone-700 text-sm">{item}</span>
                  <button
                    onClick={() => setUploadedItems(prev => prev.filter((_, i) => i !== index))}
                    className="text-stone-400 hover:text-stone-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Link Input */}
      {uploadType === 'link' && (
        <div className="mb-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-medium text-stone-800">Share Links</h5>
            <button
              onClick={() => setUploadType(null)}
              className="text-amber-600 hover:text-amber-700 text-sm font-medium"
            >
              Change method
            </button>
          </div>
          
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Paste Instagram, Pinterest, or website link..."
            className="w-full p-4 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          
          <Button
            onClick={() => {
              if (linkUrl) {
                setUploadedItems(prev => [...prev, linkUrl])
                setLinkUrl('')
              }
            }}
            variant="secondary"
            className="mt-3"
            disabled={!linkUrl}
          >
            Add Link
          </Button>
          
          {uploadedItems.length > 0 && (
            <div className="space-y-2 mt-4">
              {uploadedItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                  <span className="text-stone-700 text-sm truncate flex-1 mr-2">{item}</span>
                  <button
                    onClick={() => setUploadedItems(prev => prev.filter((_, i) => i !== index))}
                    className="text-stone-400 hover:text-stone-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Colour Selection */}
      {uploadType === 'color' && (
        <div className="mb-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-medium text-stone-800">Select Colours</h5>
            <button
              onClick={() => setUploadType(null)}
              className="text-amber-600 hover:text-amber-700 text-sm font-medium"
            >
              Change method
            </button>
          </div>
          
          <div className="grid grid-cols-6 gap-3">
            {[
              '#1a1a1a', '#4a4a4a', '#7a7a7a', '#b8860b', '#8b4513', '#a0522d',
              '#2f4f4f', '#191970', '#4b0082', '#800020', '#228b22', '#dc143c'
            ].map((color) => (
              <button
                key={color}
                onClick={() => setUploadedItems(prev => [...prev, color])}
                className="w-full aspect-square rounded-lg border-2 border-stone-200 hover:border-stone-400 transition-colors"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          
          {uploadedItems.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {uploadedItems.map((color, index) => (
                <div key={index} className="relative">
                  <div 
                    className="w-12 h-12 rounded-lg border-2 border-stone-200"
                    style={{ backgroundColor: color }}
                  />
                  <button
                    onClick={() => setUploadedItems(prev => prev.filter((_, i) => i !== index))}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Additional Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tell us about your style preferences, occasions, or any specific details..."
          className="w-full p-4 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Inspiration Categories */}
      <div className="mb-6">
        <p className="text-sm font-medium text-stone-700 mb-3">What's this inspiration for?</p>
        <div className="flex flex-wrap gap-2">
          {['Next pair', 'Colour preferences', 'Style direction', 'Special occasion', 'General ideas'].map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-full text-sm text-stone-700 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={onClose} variant="secondary" className="flex-1">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="primary" 
          className="flex-1"
          disabled={uploadedItems.length === 0 && !notes.trim()}
        >
          Share Inspiration
        </Button>
      </div>
    </div>
  )
}