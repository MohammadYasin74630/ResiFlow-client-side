import { CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ModalWrapper, Reoverlay } from 'reoverlay';
import 'reoverlay/lib/ModalWrapper.css';
import AnnouncementForm from './AnnouncementForm';

const AnnouncementModal = ({ anouncement, enableLoading, disableLoading, axiosSecure, refetch }) => {

    const [isClosing, setIsClosing] = useState(false);

    const closeModal = () => {
        if (isClosing) return;
        setIsClosing(true);
        setTimeout(() => {
            Reoverlay.hideModal();
        }, 500);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && !isClosing) {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isClosing]);

    return (
        <ModalWrapper wrapperClassName={`${isClosing ? 'fade-out' : ''}`} contentContainerClassName={`rounded-sm animate__animated ${isClosing ? "animate__zoomOut" : "animate__zoomIn"} animate__faster`} onClose={closeModal}>
            <AnnouncementForm anouncement={anouncement} axiosSecure={axiosSecure} refetch={refetch} enableLoading={enableLoading} disableLoading={disableLoading} />
            <button className='absolute -top-3 -right-3 bg-error text-base-100 rounded-full cursor-pointer' onClick={closeModal}>
                <CircleX size={30} />
            </button>
        </ModalWrapper>
    )
}

export default AnnouncementModal