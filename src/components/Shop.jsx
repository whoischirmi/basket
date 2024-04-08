import { useState, useEffect } from "react";
import { API_KEY, API_URL} from "../config";
import { Preloader } from "./preloader";
import { GoodsList } from "./GoodsList";
import { Cart } from "./cart";
import {BasketList } from "./basketList";
import { Alert } from "./alert";

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", API_KEY);

    const requestOptions = {method: "GET", headers: myHeaders};

    const [isBasketShow, setBasketShow] = useState(false);
    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    };

    const closeAlert = () => {
        setAlertName("");
    };

    const [alertName, setAlertName] = useState("");

    const addToBasket = (item) => {
        const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            };
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) =>{
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    };
                } else {
                    return orderItem;
                }
            });
            setOrder(newOrder);
        }
        setAlertName(item.name);
    };

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter((el) => el.id !== itemId);
        setOrder(newOrder);
    };

    const incQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if (el.id === itemId) {
                const newQantity = el.quantity + 1;
                return {
                    ...el,
                    quantity: newQantity,
                };
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    };

    const decQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if (el.id === itemId) {
                const newQantity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQantity >= 0 ? newQantity : 0,
                };
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    };

    useEffect(function getGoods() {
        fetch(API_URL, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                data.shop && setGoods(data.shop);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);
    
    return(
        <main className="container content">
            <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
            {loading ? (
                <Preloader /> 
            ) : (
                <GoodsList goods={goods} addToBasket={addToBasket} />
                )}
                {isBasketShow && (
                < BasketList 
                    order={order} 
                    handleBasketShow={handleBasketShow} 
                    removeFromBasket={removeFromBasket} 
                    incQuantity={incQuantity}
                    decQuantity={decQuantity}
                />
                )}
                {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
        </main>
    ); 
}
export { Shop };