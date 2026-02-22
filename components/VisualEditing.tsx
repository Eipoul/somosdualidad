'use client'

import {useEffect, useState, type ComponentType} from 'react'

type VisualEditingProps = {
  portal?: boolean
}

const importVisualEditingModule = new Function('moduleName', 'return import(moduleName)') as (
  moduleName: string,
) => Promise<{VisualEditing?: ComponentType<VisualEditingProps>}>

export function VisualEditing() {
  const [LoadedVisualEditing, setLoadedVisualEditing] = useState<ComponentType<VisualEditingProps> | null>(null)

  useEffect(() => {
    let mounted = true

    importVisualEditingModule('@sanity/visual-editing/react')
      .then((mod) => {
        if (!mounted || !mod.VisualEditing) return
        setLoadedVisualEditing(() => mod.VisualEditing as ComponentType<VisualEditingProps>)
      })
      .catch(() => {
        // No-op fallback: if the visual editing package isn't available in this build,
        // we avoid crashing the app and simply don't render overlays.
      })

    return () => {
      mounted = false
    }
  }, [])

  if (!LoadedVisualEditing) return null

  return <LoadedVisualEditing portal />
}
