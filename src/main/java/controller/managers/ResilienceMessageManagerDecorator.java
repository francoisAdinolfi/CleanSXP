package controller.managers;

import model.api.Manager;
import model.api.ManagerDecorator;
import model.entity.Message;
import network.api.Peer;

public class ResilienceMessageManagerDecorator extends ManagerDecorator<Message>{

	public ResilienceMessageManagerDecorator(Manager<Message> em, Peer peer) {
		super(em);
	}

}
