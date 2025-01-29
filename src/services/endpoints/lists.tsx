import { axiosConfig } from "../config/axiosConfig";

export type ShoppingListItem = {
  id: number;
  name: string;
};

export type Collaborator = {
  id: number;
  fullName: string;
  username: string;
  email: string;
  avatarUrl: string;
  isOwner?: boolean;
};

export type ShoppingList = {
  id: number | string;
  uuid: string;
  name: string;
  createdAt: string;
  ownerName: string
  owner: boolean;
  collaborators: Collaborator[];
  itemsCount: number;
};

export type ShareLinkInfo = {
  username: string;
  listName: string;
  listId: string;
  token: string;
};

export const getLists = async (token: string): Promise<ShoppingList[]> => {
  const response = await axiosConfig.get<ShoppingList[]>("/shopping-lists/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getList = async (
  id: string,
  token: string
): Promise<ShoppingList> => {
  const response = await axiosConfig.get<ShoppingList>(
    `/shopping-lists/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createShoppingList = async (
  token: string,
  name: string
): Promise<void> => {
  const response = await axiosConfig.post<void>(
    "/shopping-lists/",
    {
      name,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const shareShoppingList = async (
  id: number,
  token: string
): Promise<string> => {
  const response = await axiosConfig.post<string>(
    `/share/list/${id}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getSharedLinkInfo = async (
  urlToken: string,
  token: string
): Promise<ShareLinkInfo> => {
  const response = await axiosConfig.get<ShareLinkInfo>(
    `/share/info/${urlToken}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  window.location.href = `/info?username=${response.data.username}&listName=${response.data.listName}&listId=${response.data.listId}&token=${response.data.token}`;

  return response.data;
};

export const acceptSharedLink = async (
  sharedToken: string,
  token: string
): Promise<void> => {
  const response = await axiosConfig.post<void>(
    `/share/accept/${sharedToken}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const stopSharingList = async (
  id: string,
  token: string
): Promise<void> => {
  const response = await axiosConfig.delete<void>(
    `/shopping-lists/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateListName = async (
  id: string,
  name: string,
  token: string
): Promise<void> => {
  const response = await axiosConfig.patch<void>(
    `/shopping-lists/${id}`,
    {
      name,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getShoppingListItems = async (
  id: string,
  token: string
): Promise<ShoppingListItem[]> => {
  const response = await axiosConfig.get<ShoppingListItem[]>(
    `/shopping-lists/${id}/items`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};