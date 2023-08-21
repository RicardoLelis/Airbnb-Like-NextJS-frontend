import Image from 'next/image'
import '../app/globals.css'

export default function Card({ props }) {
    return (
        <div className="w-1/4">
            <a href={"/properties/" + props.id} className='m-3 rounded-lg hover:cursor-pointer'>
                {props.photos && 
                        props.photos.map((photo) => {
                            return (
                                <Image 
                                    className='rounded-lg'
                                    key={photo.id}
                                    src={photo.url}
                                    width={300}
                                    height={200}
                                    alt={photo.alt_text}
                                />
                            )
                })}
                <p className='font-semibold'>{props.location }</p>
                <p>Stay with {props.host.username }</p>
                <p>{props.title}</p>
                <p>{props.available_start} - {props.available_end}</p>
                <p className='font-bold'>{props.price} €/night</p>
            </a>
        </div>
  )
}
