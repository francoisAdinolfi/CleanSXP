package network.api;

import network.api.service.Service;

public interface MessageRequestService extends Service{
	/**
	 * Send messages request
	 * @param title message title
	 * @param who sender
	 * @param uris target peers
	 */
	public void sendRequest(String title, String who, String ...uris);
	
	public static final String NAME = "messagesSender";
}
