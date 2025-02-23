import { CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ModalWrapper, Reoverlay } from 'reoverlay';
import 'reoverlay/lib/ModalWrapper.css';
import UpdateProfile from '../pages/UpdateProfile/UpdateProfile';

const UpdateUserModal = ({ user, setUser, updateUserInfo }) => {

    const [isClosing, setIsClosing] = useState(false);

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            Reoverlay.hideModal();
        }, 300);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <ModalWrapper wrapperClassName={`${isClosing ? 'fade-out' : ''}`} contentContainerClassName={`rounded-sm animate__animated ${isClosing ? "animate__zoomOut" : "animate__zoomIn"} animate__faster`} onClose={closeModal}>
            <UpdateProfile user={user} updateUserInfo={updateUserInfo} setUser={setUser} />
            <button className='absolute -top-3 -right-3 bg-error text-base-100 rounded-full cursor-pointer' onClick={closeModal}>
                <CircleX size={30} />
            </button>
        </ModalWrapper>
    )
}

export default UpdateUserModal