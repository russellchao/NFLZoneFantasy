export const getPoints = async (username) => {
    const response = await fetch(
        `${process.env.SPRING_URL}/api/v1/auth/getPoints?username=${username}`, 
    {
        method: "GET"
    });

    if (!response.ok) {
        console.error("Failed to get points:", response.statusText);
    }

    const points = parseInt(await response.text(), 10);

    console.log(`Retrieved points for user ${username}: ${points}`);

    return points; 
}

export const addPoints = async (username, pointsToBeAdded) => {
    const currentPoints = await getPoints(localStorage.getItem("username"));
    let newPoints = currentPoints + pointsToBeAdded;

    if (newPoints < 0) { newPoints = 0; }

    console.log(`Updating points for user ${username}. Adding ${pointsToBeAdded} to the ${currentPoints} current points.`);

    const response = await fetch(
        `${process.env.SPRING_URL}/api/v1/auth/setPoints?username=${username}&points=${newPoints}`, 
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        console.error("Failed to update points:", response.statusText);
    }

    // Don't forget to update the number of points in the local storage so that it's reflected in the navbar
    localStorage.setItem("points", newPoints);

    // Dispatch an event to update the points in the navbar without having to refresh
    window.dispatchEvent(new Event("pointsUpdated"));
};