import React, { useState } from 'react'
import { Loading } from '../../../components/loading'
import { useForm } from 'react-hook-form'
import { useTranslation, Trans } from 'react-i18next'

// import { useTranslation, Trans } from 'react-i18next';

const CreatePublicRoom = ({ matrixClient }) => {
  const [loading, setLoading] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [topic, setTopic] = useState('')
  // const [userid, setUserid] = useState([])
  // const [newRoom, setNewRoom] = useState('')
  // const [radio, setRadio] = useState(true)
  const { register, handleSubmit, errors } = useForm()
  const { t } = useTranslation('admin')

  const changeName = e => setRoomName(e.target.value)
  const changeTopic = e => setTopic(e.target.value)
  // const changeUser = e => setUserid(e.target.value)

  const createPublicRoom = async () => {
    const moderator = []
    // moderator.push(userid)
    setLoading(true)
    const opts = {
      room_alias_name: roomName,
      visibility: 'public',
      invite: moderator,
      name: roomName,
      topic: topic
    }
    console.log(roomName, topic, opts)
    try {
      await matrixClient.createRoom(opts)
    } catch (e) {
      console.log(e.data.error)
    } finally {
      setLoading(false)
    }
  }
  /*
  useEffect(() => {
    // don't know why but react had problems with daisychained ternary conditionals
    if (newRoom !== '') {
      radio
        ? (
            makeModerator()
          )
        : (
            alert(`The room  roomName + '-' + postfix} has been created. ${userid} was invited but NOT promoted to moderator.`)
          )
    }
    setLoading(false)
    // eslint-disable-next-line
  }, [newRoom]);
  useEffect(() => {
    console.log(radio)
  }, [radio])

  const makeModerator = async () => {
    const room = matrixClient.getRoom(newRoom)
    matrixClient.setPowerLevel(newRoom, userid, 50, room.currentState.getStateEvents('m.room.power_levels', ''))
    alert(`The room ${roomName} has been created. \n ${userid} has been promoted to moderator.`)
    setTopic('')
    setRoomName('')
    setUserid('')
    setLoading(false)
  }
*/

  return (
    <section className="create-room">
      <h2><Trans t={t} i18nKey="create">Create a <u>public</u> room</Trans></h2>
      <form onSubmit={handleSubmit(createPublicRoom)}>
        <div>
          <label htmlFor="name">Name</label>
          <input name="roomName" type="text" placeholder="public_room" value={roomName} onChange={changeName} ref={register({ required: true })} />
          {errors.roomName && "can't be empty"}
        </div>
        <div>
          <label htmlFor="roomTopic">Topic</label>
          <textarea name="roomTopic" type="text" rows="3" spellCheck="true" placeholder={t('What is this room about') + '?'} value={topic} onChange={changeTopic} />
        </div>
        {/* }
          <label htmlFor="moderator">Moderator</label>
        <input name="moderator" type="text" placeholder="userid" value={userid} onChange={changeUser} ref={register({ required: true })} />
        {errors.moderator && "can't be empty"}
        <label htmlFor="moderatorRadio">Moderator</label>
        <input type="radio" id="mod" name="modYes" checked={radio === true} onChange={() => setRadio(true)} />
        <label htmlFor="room">Yes</label>
        <input type="radio" id="mod" name="modNo" checked={radio === false} onChange={() => setRadio(false)} />
        <label htmlFor="account">No</label>
  */}
        <button type="submit" name="createRoom">{loading ? <Loading /> : t('SUBMIT')}</button>

      </form>
    </section>
  )
}
export default CreatePublicRoom
