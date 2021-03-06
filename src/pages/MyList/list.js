import React, { useContext, useEffect, useState } from 'react'
import SearchComponent from '../../components/Search/search.component';
import './list.scss'
import Modal from '../../components/modal/modal.component';
import ModalDetails from '../../components/modal/modalDetails.component';
import { FirebaseContext } from '../../context/firebase';




const List = () => {

    const { firebase } = useContext(FirebaseContext);
    const user = firebase.auth().currentUser || {};
    const baseImgUrl = 'https://image.tmdb.org/t/p/original/';


    const [listItems, setListItems] = useState([]);


    const [backdrop, setBackdrop] = useState(false);
    const [play, setplay] = useState(false);
    const [movie, setMovie] = useState('');


    function BackdropHandler(movie) {
        setMovie(movie);

        setBackdrop(true);
    }

    function playHandler(movie) {
        setplay(true);
        BackdropHandler(movie);
    }

    function onCloseHandler() {
        setBackdrop(false);
        setplay(false);
    }


    useEffect(() => {
        async function getList() {
            const db = firebase.firestore();
            try {
                const res = await db.collection('movies').doc(user.uid).get();
                let datas = res.data().id;
                let data = [];
                for (const item in datas) {
                    data.push(datas[item]);
                }

                setListItems(data);
            }
            catch (e) {
                console.log(e.message)
            }
        }

        getList();

    }, [user])




    const onRemoveFromList = async (movie) => {
        const db = firebase.firestore();
        try {


            const res = await db.collection('movies').doc(user.uid).update({
                id: firebase.firestore.FieldValue.arrayRemove(movie)
            });

            let data = [];
            data = listItems;
            data = data.filter(film => film.id !== movie.id);
            setListItems(data);
            // console.log("data", data);
            // console.log(res);
            // console.log("remove item");
            onCloseHandler()
        }
        catch (e) {
            console.log(e.message)
        }

    }

    return (
        <div>
            {
                backdrop &&
                (

                    <Modal
                        show={backdrop}
                        close={onCloseHandler}
                        movie={movie}
                    >
                        <ModalDetails movie={movie} playNow={play} addToList={onRemoveFromList} added={true} />
                    </Modal>
                )
            }



            <div className="search-page">
                <h1></h1>
                <h1 className="search-page__title">My List</h1>
                <div className="search-page__outer">
                    {
                        listItems?.length === 0 ?
                            <div style={{ color: "white", marginLeft: "0%", lineHeight: "3" }}>
                                <h2>Currently No Item in the List</h2>
                            </div>
                            :
                            (
                                <div className="search-page__inner">
                                    {


                                        listItems.map(item =>
                                            item.poster_path
                                                ?
                                                <SearchComponent
                                                    key={item.id}
                                                    item={item}
                                                    image={baseImgUrl + item.poster_path}
                                                    handleItemExpand={BackdropHandler}
                                                    HandlePlay={playHandler}
                                                    title={item.title} /> : null
                                        )



                                    }
                                </div>
                            )
                    }

                </div>
            </div>
        </div>
    )
}

export default List
