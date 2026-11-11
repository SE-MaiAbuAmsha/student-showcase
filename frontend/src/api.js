// one place for every request to the PHP API.
export async function api(url, options = {}) {
  let response;
  try {
    response = await fetch(url, options);
  } catch {
    // the server is off or the network is down
    throw new Error("Could not reach the server.");
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // the answer was not JSON (for example a PHP warning)
  }

  // 400, 401, 403, 404, 500... become an Error carrying the server's message
  if (!response.ok) {
    throw new Error(data?.error || "Something went wrong. Please try again.");
  }
  return data;
}
