import { VscClose } from 'react-icons/vsc';
import Modal from 'react-modal';

const customStyles: Modal.Styles = {
    overlay: {
        position: 'fixed',
        zIndex: 1020,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '0.3rem',
        display: "flex",
        flexDirection: "column",
    },
};

export function ModalVerfiy(
    props: {
        modalIsOpen: boolean,
        setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    }) {
    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={() => { props.setModalIsOpen(false) }}
            style={customStyles}
        >
            <button className="ModalCancel" onClick={() => { props.setModalIsOpen(false) }} > <VscClose size={20} /></button>
            <label >メール:
                <input className='input' type='text' placeholder='メール' onChange={(e) => { }} defaultValue="" />
            </label>
            <button className="ModalButton" onClick={() => { }}>送信</button>
        </Modal>
    );
}