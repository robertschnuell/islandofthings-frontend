import React, { useEffect, useState } from 'react';
import { Loading } from "../../components/loading";
import { useHistory } from 'react-router-dom'
import roomStructure from "../../assets/data/naming.json"
import PublicRooms from "../../components/matrix_public_rooms"
import * as matrixcs from "matrix-js-sdk";
import { useTranslation } from 'react-i18next';
import Matrix from "../../Matrix"



const Explore = () => {
  const [joinedRooms, setJoinedRooms] = useState([]);
  const [joinId, setJoinId] = useState("");
  const [leaveId, setLeaveId] = useState("");
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const publicRooms = PublicRooms();
  const history = useHistory();
  const { t } = useTranslation(['translation', 'explore']);
  const matrixClient = Matrix.getMatrixClient();

  //first let's fetch all rooms our user is part of
  const getJoinedRooms = async () => {
    try {
      const answer = await matrixClient.getJoinedRooms();
      const getNames = await Promise.all(answer.joined_rooms.map(async (roomId) => {
        try {
          const room = await matrixClient.getStateEvent(roomId, "m.room.name");
          if (room.name !== "") {
            return room.name;
          } else {
            return "[[ Untyped Chat ]]";
          }
        } catch (error) {
          return "[[ Private Chat ]]";
        }
      }));
      setJoinedRooms(getNames);
    } catch (e) {
      if (e === "Invalid macaroon passed.") {
        history.push('/login')
      } else if (e === "Unrecognised access token") {
        alert("Oops something went wrong! Please try loggin in again.")
        localStorage.clear();
        history.push('/login');
      }
      console.log(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getJoinedRooms();
    setUpdate(false);
    // eslint-disable-next-line
  }, [update, t])

  useEffect(() => {
    matrixClient.leave(leaveId)
      .then(() => setUpdate(true))
      .catch((e) => {
        console.log("thrown error because leaveId can't be empty")
      });
    setLeaveId("");
  }, [leaveId])

  useEffect(() => {
    matrixClient.joinRoom(joinId)
      .then(() => setUpdate(true))
      .catch((e) => {
        console.log("thrown error because joinId can't be empty")
      }
      );
    setJoinId("");
  }, [joinId])

  //component
  const RoomList = ({ faculty, displayName, type }) => {
    const sort = [...publicRooms].sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    return (
      <>
        <h3>{displayName}</h3>
        {[...sort].map(publicRoom => (
          <div className="room" key={publicRoom.room_id}>
            {publicRoom.avatar_url ? (
              <img className="avatar" src={matrixClient.mxcUrlToHttp(publicRoom.avatar_url, 100, 100, "crop", false)} alt="avatar" />
            ) : (
                <canvas className="avatar" style={{ backgroundColor: 'white' }}></canvas>
              )}
            <label htmlFor={publicRoom.room_id} key={publicRoom.name} name={faculty}>{publicRoom.name}</label>
            {joinedRooms.includes(publicRoom.name) ? <button onClick={() => setLeaveId(publicRoom.room_id)} name="Leave">
              {loading ? <Loading /> : t('explore:buttonLeave')}</button> :
              <button onClick={() => setJoinId(publicRoom.room_id)} name="Join">{loading ? <Loading /> : t('explore:buttonJoin')}</button>}
          </div>
        ))}
      </>
    )
  }

  return (
    <section className="explore">
      {publicRooms.length === 0 ? <Loading /> : <RoomList />}
    </section>
  );
}

export default Explore;

