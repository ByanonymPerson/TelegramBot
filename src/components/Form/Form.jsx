import React, { useCallback, useEffect, useState } from "react";
import './Form.css'
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
     const [name,setName] = useState('');
     const [time,setTime] = useState('');
     const {tg} = useTelegram();
     
     const onSendData = useCallback(()=>{
         const data = {
            name,
            time,
         }
         tg.sendData(JSON.stringify(data));
     }, [name,time])

     useEffect(()=>{
        tg.onEvent('mainButtonClicked',onSendData)
        return() => {
            tg.offEvent('mainButtonClicked',onSendData)
        }
     },[])

     useEffect(() => {
       tg.MainButton.setParams({
        text: 'Отправить данные'
       })
     }, [])

     useEffect(() => {
           if(!time || !name){
            tg.MainButton.hide();
           }else {
            tg.MainButton.show();
           }
     },[name,time])

     const onChangeName = (e) => {
        setName(e.target.value)
     }

     const onChangeTime = (e) => {
        setTime(e.target.value)
     }

   

    return(
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input
             className={'input'}
              type="text" 
              placeholder={'Имя'}
              value={name}
              onChange={onChangeName}
              />
              <h3>Введите время в которое вам удобно забрать</h3>
            <input 
            className={'input'}
             type="text" 
             laceholder={'Время'}
             value={time}
             onChange={onChangeTime}
             />
        </div>
    )
}

export default Form;