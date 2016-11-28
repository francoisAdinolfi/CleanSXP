package model.syncManager;

import model.api.MessageSyncManager;
import model.entity.Message;

public class MessageSyncManagerImpl extends AbstractSyncManager<Message> implements MessageSyncManager {
	
	public MessageSyncManagerImpl() {
		super();
		this.initialisation("persistence", Message.class);
	}
}
