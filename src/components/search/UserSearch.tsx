'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useSearchProfiles } from '@/hooks/useProfile'
import { useState } from 'react'

interface UserSearchProps {
  onSelectUser: (userId: string) => void
}

export const UserSearch = ({ onSelectUser }: UserSearchProps) => {
  const [query, setQuery] = useState('')
  const { data: results } = useSearchProfiles(query)

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search students..."
          className="pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {results && results.data && results.data.length > 0 && (
        <div className="mt-4 space-y-2">
          {results.data.map((profile: any) => (
            <Button
              key={profile.id}
              variant="outline"
              className="w-full justify-start"
              onClick={() => onSelectUser(profile.id)}
            >
              <div className="text-left">
                <p className="font-semibold">{profile.display_name}</p>
                <p className="text-xs text-gray-500">@{profile.username}</p>
              </div>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
