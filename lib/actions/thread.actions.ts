"use server"

import { revalidatePath } from "next/cache"
import { connectToDB } from "../mongoose"
import Thread from "../models/thread.model"
import User from "../models/user.model"

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
}

export async function createThread({ text, author, communityId, path }:Params) {
    connectToDB()
    
    const createdThread = await Thread.create({
        text,
        author,
        communityId: null,
        path
    })

    await User.findByIdAndUpdate(author, {
        $push: { threads: createdThread._id}
    })

    revalidatePath(path)
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB()

    const skipAmount = (pageNumber - 1) * pageSize

    const postsQuery = Thread.find({parentId: { $in : [null, undefined]} })
        .sort({createdAt: 'desc'})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({path: 'author', model: User})
        .populate({
            path: 'children',
            populate: {
                path: 'author',
                model: User,
                select: "_id name parentId image"
            }
        })
    
        const totalPostsCount = await Thread.countDocuments({parentId: { $in : [null, undefined]} })

        const posts = await postsQuery.exec()

        const isNext = totalPostsCount > skipAmount + posts.length

        return { posts, isNext }

}