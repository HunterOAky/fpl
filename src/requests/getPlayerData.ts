const url = 'https://localhost:8443/points';

type ManagerList = Record<string, string>;

export const getPlayerData = async (managerList: ManagerList) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(managerList),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};
