import React, {useState} from 'react'
import { blockUser, unblockUser, deleteUser} from '../http/controlAPI';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom'
import {LOGIN_ROUTE} from '../utils/consts';
import {observer} from 'mobx-react-lite'


const ToolBar = observer((props) => {
    const {checked} = props;
    const [select, setSelect] = useState(0);
    const navigation = useNavigate();    

    const block = () => {
        let emailAuth;
        setSelect(select+1)
        try {
            emailAuth = jwt_decode(localStorage.getItem('token')).email;
        } catch(e) {
            console.log(e)
        }
        checked.forEach(async (elem) => {
            if(elem === emailAuth) {
                await unblockUser(emailAuth)
                navigation(LOGIN_ROUTE)
            } else {
                await blockUser(elem)
            }
        })
    }
    const unBlock = () => {
        setSelect(select+1)
        checked.forEach(async (elem) => {
            await unblockUser(elem)
        })
    }
    const deleteUserChecked = () => {
        setSelect(select+1)
        checked.forEach(async (elem) => {
            await deleteUser(elem)
        })
    }
    return (
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary" onClick={block}>Block</button>
            <button type="button" class="btn btn-secondary" onClick={unBlock}>Unblock</button>
            <button type="button" class="btn btn-secondary" onClick={deleteUserChecked}>Delete</button>
        </div>
    )
})

export default ToolBar