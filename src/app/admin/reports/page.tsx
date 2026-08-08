'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function AdminReportsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Content Reports</h1>

      <Card>
        <CardHeader>
          <CardTitle>Pending Reports</CardTitle>
          <CardDescription>Review user reports and take action</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-gray-500 py-8 text-center">
            <p>No reports to review</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
