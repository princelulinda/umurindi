'use client'

import { useState, useEffect } from 'react'

/**
 * Hook personnalisé pour détecter si la fenêtre correspond à une requête média spécifique
 * @param query - La requête média à évaluer (ex: '(min-width: 768px)')
 * @returns boolean - True si la requête média correspond, false sinon
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    // Vérifiez que window est défini (exécution côté client)
    if (typeof window !== 'undefined') {
      const mediaQueryList = window.matchMedia(query)
      
      // Fonction de gestionnaire pour les changements
      const handler = (event: MediaQueryListEvent) => setMatches(event.matches)
      
      // Vérification initiale
      setMatches(mediaQueryList.matches)
      
      // Ajout de l'écouteur pour les changements futurs
      mediaQueryList.addEventListener('change', handler)
      
      // Nettoyage lors du démontage
      return () => mediaQueryList.removeEventListener('change', handler)
    }
  }, [query])

  return matches
}

/**
 * Hook prédéfini pour détecter les appareils mobiles (largeur < 768px)
 * @returns boolean - True si on est sur mobile, false sinon
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)')
}

/**
 * Hook prédéfini pour détecter les tablettes (768px <= largeur < 1024px)
 * @returns boolean - True si on est sur tablette, false sinon
 */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
}

/**
 * Hook prédéfini pour détecter les ordinateurs de bureau (largeur >= 1024px)
 * @returns boolean - True si on est sur desktop, false sinon
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)')
}