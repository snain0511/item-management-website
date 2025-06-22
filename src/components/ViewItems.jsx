import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const ViewItems = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openModal = (item) => {
    setSelectedItem(item)
    setCurrentImageIndex(0)
  }

  const closeModal = () => {
    setSelectedItem(null)
    setCurrentImageIndex(0)
  }

  const getAllImages = (item) => {
    const images = [item.coverImage]
    if (item.additionalImages && item.additionalImages.length > 0) {
      images.push(...item.additionalImages)
    }
    return images
  }

  const nextImage = () => {
    if (selectedItem) {
      const images = getAllImages(selectedItem)
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedItem) {
      const images = getAllImages(selectedItem)
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Items Found</h2>
          <p className="text-gray-600 mb-6">
            You haven't added any items yet. Start by adding your first item!
          </p>
          <Button onClick={() => window.location.href = '/add-items'}>
            Add Your First Item
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">View Items</h1>
        <p className="text-gray-600 mt-2">Click on any item to view details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card 
            key={item.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => openModal(item)}
          >
            <CardContent className="p-0">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={item.coverImage}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=Image+Not+Found'
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 truncate">{item.name}</h3>
                <Badge variant="secondary" className="mb-2">
                  {item.type}
                </Badge>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedItem} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedItem?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-6">
              <div className="relative">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={getAllImages(selectedItem)[currentImageIndex]}
                    alt={`${selectedItem.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found'
                    }}
                  />
                </div>
                
                {getAllImages(selectedItem).length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {getAllImages(selectedItem).length}
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Type</h3>
                  <Badge variant="secondary" className="text-base px-3 py-1">
                    {selectedItem.type}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                {selectedItem.additionalImages && selectedItem.additionalImages.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">All Images</h3>
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                      {getAllImages(selectedItem).map((image, index) => (
                        <div
                          key={index}
                          className={`aspect-square cursor-pointer rounded border-2 overflow-hidden ${
                            index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <img
                            src={image}
                            alt={`${selectedItem.name} - Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100x100?text=Error'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ViewItems

