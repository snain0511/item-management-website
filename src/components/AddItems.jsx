import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { CheckCircle } from 'lucide-react'

const AddItems = ({ onAddItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    coverImage: '',
    additionalImages: []
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const itemTypes = [
    'Shirt',
    'Pant',
    'Shoes',
    'Sports gear',
    'Other'
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required'
    }
    
    if (!formData.type) {
      newErrors.type = 'Item type is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Item description is required'
    }
    
    if (!formData.coverImage.trim()) {
      newErrors.coverImage = 'Cover image URL is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onAddItem(formData)
      setFormData({
        name: '',
        type: '',
        description: '',
        coverImage: '',
        additionalImages: []
      })
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleAdditionalImagesChange = (value) => {
    const urls = value.split('\n').filter(url => url.trim() !== '')
    setFormData(prev => ({
      ...prev,
      additionalImages: urls
    }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Add New Item</CardTitle>
        </CardHeader>
        <CardContent>
          {showSuccess && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Item successfully added!
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter item name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Item Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select item type" />
                </SelectTrigger>
                <SelectContent>
                  {itemTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Item Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter item description"
                rows={4}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Item Cover Image URL</Label>
              <Input
                id="coverImage"
                type="url"
                value={formData.coverImage}
                onChange={(e) => handleInputChange('coverImage', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className={errors.coverImage ? 'border-red-500' : ''}
              />
              {errors.coverImage && <p className="text-sm text-red-500">{errors.coverImage}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalImages">Additional Images (Optional)</Label>
              <Textarea
                id="additionalImages"
                value={formData.additionalImages.join('\n')}
                onChange={(e) => handleAdditionalImagesChange(e.target.value)}
                placeholder="Enter additional image URLs (one per line)"
                rows={3}
              />
              <p className="text-sm text-gray-500">Enter one URL per line</p>
            </div>

            <Button type="submit" className="w-full">
              Add Item
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddItems

