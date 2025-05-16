import React from 'react'

function CartFooter() {
    return (
        <div className="flex items-center justify-between fixed bottom-0 left-0 w-full bg-white text-black shadow-2xl h-30 p-5">
            <div className="flex items-center w-1/4 pr-4">
                <input type="checkbox" className="size-6 mr-2" />
                <div className="ml-3">
                    <p className="font-serif font-bold text-left"> Select all </p>
                    <p className="font-serif italic text-left"> n items </p>
                </div>
            </div>

            <div className="flex items-center justify-center">
                <p className="font-serif text-2xl m-4"> Total: PHP 1.00 </p>
                <button className="w-40 h-15 bg-[#BC6C25] text-[#FEFAE0] m-3 rounded-[10px]"> DELETE </button>
                <button className="w-40 h-15 bg-[#606C38] text-[#FEFAE0] m-3 rounded-[10px]"> CHECK OUT </button>
            </div>
        </div>
    )
}

export default CartFooter