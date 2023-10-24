import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { ModalOverlay, ModalContainer } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ selectedImage, tags, onClose }) {
  useEffect(() => {
    const onEscapeCloseHandle = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
   window.addEventListener('keydown', onEscapeCloseHandle);
    disableBodyScroll(document);
    return () => {
      window.removeEventListener('keydown', onEscapeCloseHandle);
      enableBodyScroll(document);
    };
  }, [onClose]);

  const onBackdropCLick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlay onClick={onBackdropCLick}>
      <ModalContainer>
        <img src={selectedImage} alt={tags} />
      </ModalContainer>
    </ModalOverlay>,
    modalRoot
  );
}
Modal.propTypes = {
  selectedImg: PropTypes.string,
  tags: PropTypes.string,
  onClose: PropTypes.func,
};