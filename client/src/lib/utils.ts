import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Genera un slug SEO-friendly a partir de un texto
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
    .replace(/^-|-$/g, ''); // Remover guiones al inicio y final
}

/**
 * Genera una URL SEO-friendly para una propiedad
 */
export function generatePropertyUrl(id: number, title: string): string {
  const slug = generateSlug(title);
  return `/propiedad/${id}/${slug}`;
}

/**
 * Extrae el ID de una URL de propiedad
 */
export function extractPropertyIdFromUrl(url: string): string | null {
  const match = url.match(/\/propiedad\/(\d+)/);
  return match ? match[1] : null;
}
