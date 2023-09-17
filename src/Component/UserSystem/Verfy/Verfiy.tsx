import { memo } from 'react';
import Modal from 'react-modal';
import ReactIcon from '../../Tools/ReactIcon';

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

export interface IModalVerfiyPorps {
    modalIsOpen: boolean,
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export const ModalVerfiy = memo((props: IModalVerfiyPorps) => {
    console.log("ModalVerfiy")

    const sendMail = () => {
        console.log("送信")
    }

    /**
 * 情報入力する
 * @param e htmlイベント
 * @param mode 入力されるテキストフィールド
 */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Chnage")
    }
    return (
        <Modal
            isOpen={props.modalIsOpen}
            ariaHideApp={false}
            onRequestClose={() => { props.setModalIsOpen(false) }}
            style={customStyles}
        >
            <button className="ModalCancel" onClick={() => { props.setModalIsOpen(false) }} >
                <ReactIcon icon={"AiOutlineClose"} module={"Ai"} color={"#000"} />
            </button>
            <label >メール:
                <input className='input' type='text' placeholder='メール' onChange={handleInputChange} defaultValue="" />
            </label>
            <button className="ModalButton" onClick={sendMail}>送信</button>
        </Modal>
    );
});

