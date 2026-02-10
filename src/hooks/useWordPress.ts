import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchPosts,
  fetchPost,
  fetchCategories,
  fetchHomeData,
  fetchEstagios,
  submitOuvidoria,
  type OuvidoriaPayload,
} from '@/services/api';

export function usePosts(page = 1, perPage = 9) {
  return useQuery({
    queryKey: ['posts', page, perPage],
    queryFn: () => fetchPosts(page, perPage),
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug),
    enabled: !!slug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
}

export function useHomeData() {
  return useQuery({
    queryKey: ['home'],
    queryFn: fetchHomeData,
  });
}

export function useEstagios() {
  return useQuery({
    queryKey: ['estagios'],
    queryFn: fetchEstagios,
  });
}

export function useSubmitOuvidoria() {
  return useMutation({
    mutationFn: (payload: OuvidoriaPayload) => submitOuvidoria(payload),
  });
}
