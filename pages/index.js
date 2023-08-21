import Head from "next/head"
import '../app/globals.css'

import Navbar from "@/components/Navbar"
import Card from "@/components/Card"

export default function Home({ hotels = [] }){
    // console.log("hotels type:", typeof hotels);
    // console.log("hotels length:", hotels.length);
    return (
        <>
            <Head>
                <title>Airbnb clone</title>
            </Head>
            { /** Navbar */}
            <Navbar />
            { /** Cards */}
            <div className="mx-5 my-7">
                <h1 className="text-3xl font-semibold mb-3">Properties</h1>
                <section className="flex">
                {Array.isArray(hotels) && hotels.length > 0 ? (
                    hotels.map((hotel) => {
                    return <Card key={hotel.id} props={hotel} />;
                    })
                ) : (
                    <p>No hotels available.</p>
                )}
                </section>
            </div>
        </>
    );
}

export async function getStaticProps(){
    try{
        const res = await fetch("http://localhost:8000/api/properties/")
        const hotels = await res.json()
        
        return {
            props: { hotels }
        }
    } catch (error){
        console.error("Error fetching Hotels:", error)
        return {
            props: {hotels: []}
        }
    }
}