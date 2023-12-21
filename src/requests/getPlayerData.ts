const url = 'https://localhost:8443/points';
export const getPlayerData = async (startWeek:number, endWeek:number, managerId:string) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startWeek,
        endWeek,
        managerId
      }),
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
