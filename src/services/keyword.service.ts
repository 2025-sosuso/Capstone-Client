import api from "@/lib/axios";
import {BaseApiResponse} from "@/types/common.types";

export interface KeywordExplanationResponse {
    query: string;
    description: string;
}

export async function fetchKeywordExplanation(
    query: string
): Promise<KeywordExplanationResponse> {
    const res = await api.get<BaseApiResponse<KeywordExplanationResponse>>("/keywords", {
        params: { query },
    });
    return res.data.data;
}