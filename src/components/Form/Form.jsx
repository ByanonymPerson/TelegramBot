import React, { useCallback, useEffect, useState } from "react";
import './Form.css'
import { useTelegram } from "../../hooks/useTelegram";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";



const firebaseConfig = {
    apiKey: "AIzaSyAx7hGnf2H2od3EfujXlmbe4mxYwBwr-BQ",
    authDomain: "telegramstore-96e1e.firebaseapp.com",
    databaseURL: "https://telegramstore-96e1e-default-rtdb.firebaseio.com",
    projectId: "telegramstore-96e1e",
    storageBucket: "telegramstore-96e1e.appspot.com",
    messagingSenderId: "454886096625",
    appId: "1:454886096625:web:8fb97c3a405772d44f7350",
    measurementId: "G-S47G5VXH3Z"
  };
  

// Инициализация Firebase приложения
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const Form = () => {
     const [name,setName] = useState('');
     const [time,setTime] = useState('');
     const {tg} = useTelegram();
     
     const onSendData = useCallback(()=>{
         const data = {
            name,
            time,
         }
         // Отправка данных на базу данных Firebase
         set(ref(database, 'orders/' + Date.now()), data)
            .then(() => {
                console.log('Data successfully sent to Firebase');
            })
            .catch((error) => {
                console.error('Error sending data to Firebase: ', error);
            });
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
