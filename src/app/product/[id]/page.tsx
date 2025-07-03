import Image from "next/image"
import {Button} from "@/components/ui/button"

export default function ProductDetail() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
                {/* Product Image */}
                <div className="mb-8 lg:mb-0">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <Image
                            src="/placeholder.svg?height=600&width=600"
                            alt="Sample Product"
                            width={600}
                            height={600}
                            className="w-full h-full object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Product Information */}
                <div className="lg:pt-8">
                    {/* Product Name */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Sample Product</h1>

                    {/* Product Price */}
                    <div className="mb-6">
                        <p className="text-3xl font-bold text-gray-900">$19.99</p>
                    </div>

                    {/* Product Description */}
                    <div className="mb-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                        <p className="text-gray-600 leading-relaxed">
                            This is a sample description of the product. It provides essential information about the
                            product
                            features, benefits, and specifications that help customers make informed purchasing
                            decisions.
                        </p>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="mb-8">
                        <Button size="lg" className="w-full sm:w-auto px-8">
                            Add to Cart
                        </Button>
                    </div>

                    {/* Additional Product Info */}
                    <div className="border-t border-gray-200 pt-6">
                        <div className="space-y-3 text-sm text-gray-600">
                            <p>✓ Free shipping on orders over $50</p>
                            <p>✓ 30-day return policy</p>
                            <p>✓ Secure checkout</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
