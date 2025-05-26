import { useState, useEffect, useContext } from 'react';
import CartHeader from '../../components/CartHeader'
import CartCard from '../../components/CartCard'
import { UserContext } from '../../context/userContext';
import { toast } from 'react-hot-toast';

function UserCart() {
    const [selected, setSelected] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [mergedOrders, setMergedOrders] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(`http://localhost:5000/transaction/get-filtered-transactions-merged?orderStatus=3&email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setMergedOrders(data);
            })

            .catch(err => console.error("Error fetching merged orders:", err));

    };

    // for logging items (checking purposes)
    useEffect(() => {
        console.log("Selected items updated:", selected);
    }, [selected]);

    // for the total number of items in the cart
    useEffect(() => {
        const total = mergedOrders.reduce((acc, curr) => acc + curr.orderQty, 0);
        setTotalItems(total);
    }, [mergedOrders]);

    // for the total price of selected items
    useEffect(() => {
        const total = mergedOrders.reduce((acc, item) => {
            if (selected.includes(item._id)) {
                return acc + (item.productPrice * item.orderQty);
            }
            return acc;
        }, 0);

        setTotalPrice(total);
    }, [selected, mergedOrders]);

    // for selecting an item
    function selectItem(productId) {
        setSelected((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter(id => id !== productId)
                : [...prevSelected, productId]
        );
    }

    // for selecting all items
    function selectAllItems(e) {
        const isChecked = e.target.checked;

        if (isChecked) {
            const allProductIds = mergedOrders.map(p => p._id);
            setSelected(allProductIds);
        } else {
            setSelected([]);
        }
    }

    // for deleting checked transactions from the database.
    async function deleteItem(transactionId) {
        try {
            const response = await fetch('http://localhost:5000/transaction/remove-transaction', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: transactionId })
            });

            const result = await response.json();
            if (response.ok) {
                console.log(result.message);
                setMergedOrders(prev => prev.filter(item => item._id !== transactionId));
                toast("Deleted item.");
            } else {
                console.error('Error:', result.error);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    }

    // function for deleting selected items.
    async function deleteSelectedItems() {
        try {
            const response = await Promise.all(
                selected.map(id =>
                    fetch('http://localhost:5000/transaction/remove-transaction', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id })
                    })
                )
            );

            const failed = response.filter(res => !res.ok);
            if (failed.length > 0) {
                console.error("Some deletions failed");
            }

            setMergedOrders(prev => prev.filter(item => !selected.includes(item._id)));
            setSelected([]);
            toast("Deleted item.");
        } catch (error) {
            console.error('Network error:', error);
        }
    }

    // function for checking out
    async function checkOut() {
        try {
            const updatePromises = selected.map(id =>
                fetch('http://localhost:5000/transaction/update-transaction', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, orderStatus: 0 }),
                })
            );

            const responses = await Promise.all(updatePromises);

            const failed = responses.filter(res => !res.ok);
            if (failed.length > 0) {
                console.error("Some updates failed");
            }

            setMergedOrders(prev => prev.filter(item => !selected.includes(item._id)));
            setSelected([]);
            toast("Checked out items!");
        } catch (error) {
            console.error('Network error:', error);
        }
    }

    // function for increasing order.
    function increaseOrder(id) {
        setMergedOrders(prev =>
            prev.map(order =>
                order._id === id
                    ? { ...order, orderQty: order.orderQty + 1 }
                    : order
            )
        );

        fetch('http://localhost:5000/transaction/update-transaction', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, orderQty: mergedOrders.find(o => o._id === id).orderQty + 1 }),
        }).catch(console.error);
    }

    // function for decreasing order
    function decreaseOrder(id) {
        setMergedOrders(prev =>
            prev.map(order =>
                order._id === id && order.orderQty > 1
                    ? { ...order, orderQty: order.orderQty - 1 }
                    : order
            )
        );

        const order = mergedOrders.find(o => o._id === id);
        if (order.orderQty > 1) {
            fetch('http://localhost:5000/transaction/update-transaction', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, orderQty: order.orderQty - 1 }),
            }).catch(console.error);
        }
    }


    return (
        <div className="bg-[#FEFAE0] min-h-screen">
            <CartHeader data="Shopping Cart"></CartHeader>

            <div className="flex items-center justify-evenly h-18 m-4 p-4 bg-white rounded-[25px]">
                <div className="flex items-center w-1/4 pr-4">
                    <input type="checkbox" className="size-5 mr-2" disabled />
                    <p className="font-serif"> Product </p>
                </div>
                <p className="font-serif w-1/6"> Price </p>
                <p className="font-serif w-1/6"> Qty </p>
                <p className="font-serif w-1/6 mr-42"> Total Price </p>
            </div>

            <div>
                {
                    mergedOrders.map((product) => (
                        <CartCard
                            key={product._id}
                            data={product}
                            isSelected={selected.includes(product._id)}
                            onToggleSelect={() => selectItem(product._id)}
                            deleteItem={deleteItem}
                            increaseOrder={increaseOrder}
                            decreaseOrder={decreaseOrder}
                        />
                    ))
                }
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />

            <div className="flex items-center justify-between fixed bottom-0 left-0 w-full bg-white text-black shadow-2xl h-30 p-5">
                <div className="flex items-center w-1/4 pr-4">
                    <input type="checkbox" className="size-6 mr-2" onChange={selectAllItems} />
                    <div className="ml-3">
                        <p className="font-serif font-bold text-left"> Select all </p>
                        <p className="font-serif italic text-left"> {totalItems} items </p>
                    </div>
                </div>

                {/* for footer */}
                <div className="flex items-center justify-center">
                    <div>
                        <p className="font-serif text-2xl text-right"> Total: ₱ {totalPrice} </p>
                        <p className="font-serif italic text-right"> Cash on Delivery </p>
                    </div>
                    <button className="w-40 h-15 bg-[#BC6C25] text-[#FEFAE0] m-3 rounded-[10px]" id="addToCartButton"
                        onClick={() => { deleteSelectedItems() }}> DELETE </button>
                    <button className="w-40 h-15 bg-[#606C38] text-[#FEFAE0] m-3 rounded-[10px]" id="addToCartButton"
                        onClick={() => checkOut()}> CHECK OUT </button>
                </div>
            </div>
        </div>
    )
}

export default UserCart