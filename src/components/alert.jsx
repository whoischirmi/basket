import { useEffect } from "react";

function Alert(props) {
    const { name = "", closwAlert = Function.prototype } = props;

    useEffect(() => {
        const timerId = setTimeout(closwAlert, 3000);

        return () => {
            clearTimeout(timerId);
        };
    }, [name]);

    return (
        <div id="toast-container">
            <div className="toast">{name} добавлен  в корзину</div>
        </div>
    );
}
export { Alert };