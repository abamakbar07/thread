import Image from "next/image"
import Link from "next/link"

interface Props {
    id: string
    text: string
    author: {
        name: string
        image: string
        id: string
    }
    community: {
        id: string
        name: string
        image: string
    } | null
    createdAt: string
}

function ThreadCard ({ id, text, author, community, createdAt }: Props) {
    return (
        <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
            <div className='flex items-start justify-between'>
                <div className='flex w-full flex-1 flex-row gap-4'>
                    <div className='flex flex-col items-center'>

                    <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
                        <Image
                        src={author.image}
                        alt='user_community_image'
                        fill
                        className='cursor-pointer rounded-full'
                        />
                    </Link>
                    <div className='thread-card_bar' />

                    </div>

                    <div className='flex w-full flex-col'>
                    <Link href={`/profile/${author.id}`} className='w-fit'>
                        <h4 className='cursor-pointer text-base-semibold text-light-1'>
                        {author.name}
                        </h4>
                    </Link>

                    <p className='mt-2 text-small-regular text-light-2'>{text}</p>

                    </div>

                </div>
            </div>
        </article>
    )
}

export default ThreadCard