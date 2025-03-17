
function NewsLetterForm() {
    return (
        <>
            <div className="text-base-100 text-center space-y-6 p-2">
                <h3 className="text-xl md:text-3xl font-bold lg:w-max mx-auto">SUBSCRIBE TO OUT NEWS LETTER</h3>
                <p className="max-w-[55ch] font-medium text-base-300">join our mailing list today and be the first to know what’s happening in your community!</p>

                <form className="text-base-content flex max-sm:flex-col gap-2 justify-center p-4">
                    <input type="text" placeholder="Email" className="input max-w-md w-full" />
                    <button className="btn btn-accent text-base-100 max-w-md" type="button">Subscribe</button>
                </form>
            </div>
        </>
    )
}

export default NewsLetterForm