export interface UpdateProfileImageResponse {
    imageUrl: string;
}

export interface ProfileService {
    updateProfileImage(userId: string, file: Uint32Array): Promise<UpdateProfileImageResponse>;
}