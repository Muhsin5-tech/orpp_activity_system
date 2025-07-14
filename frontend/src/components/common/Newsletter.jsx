function Newsletter() {
    return (
      <section className="bg-[#abc9e8] py-10 text-center">
        <h5 className="text-xl font-semibold text-[#002147] mb-4">Subscribe to our Newsletter</h5>
        <form className="flex flex-wrap justify-center gap-3">
          <input
            type="email"
            placeholder="Your email address"
            required
            className="px-4 py-2 rounded-full border border-[#1F3A93] w-72"
          />
          <button
            type="submit"
            className="bg-[#FF9F1C] text-white font-bold px-6 py-2 rounded-full"
          >
            Subscribe Now
          </button>
        </form>
      </section>
    );
  }
  
  export default Newsletter;
  