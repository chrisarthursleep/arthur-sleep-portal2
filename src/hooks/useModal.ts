import { useState, useCallback } from 'react'
import { ModalType } from '@/types/navigation'

export function useModal() {
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [modalData, setModalData] = useState<any>(null)

  const openModal = useCallback((type: ModalType, data?: any) => {
    setActiveModal(type)
    if (data) {
      setModalData(data)
    }
  }, [])

  const closeModal = useCallback(() => {
    setActiveModal(null)
    setModalData(null)
  }, [])

  const isOpen = useCallback((type: ModalType) => {
    return activeModal === type
  }, [activeModal])

  return {
    activeModal,
    modalData,
    openModal,
    closeModal,
    isOpen
  }
}