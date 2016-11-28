package controller.managers;

import java.util.ArrayList;
import java.util.Collection;

import com.fasterxml.jackson.core.type.TypeReference;

import controller.tools.JsonTools;
import model.api.Manager;
import model.api.ManagerDecorator;
import model.api.ManagerListener;
import model.entity.Message;
import network.api.MessageRequestService;
import network.api.MessageService;
import network.api.Messages;
import network.api.Peer;
import network.api.SearchListener;
import network.api.ServiceListener;
import network.api.advertisement.MessageAdvertisementInterface;
import network.api.service.Service;
import network.factories.AdvertisementFactory;

public class NetworkMessageManagerDecorator extends ManagerDecorator<Message>{

	private Peer peer;
	private String who;
	
	/**
	 * 
	 * @param em Message async manager
	 * @param peer Peer instance, started
	 * @param who who own this instance
	 */
	public NetworkMessageManagerDecorator(Manager<Message> em, Peer peer, String who) {
		super(em);
		this.peer = peer;
		this.who = who;
	}

	@Override
	public void findOneById(final String id, final ManagerListener<Message> l) {
		super.findOneById(id, l);
	}

	@Override
	public void findAllByAttribute(String attribute, final String value, final ManagerListener<Message> l) {
		super.findAllByAttribute(attribute, value, l);
		final MessageRequestService messageSender = (MessageRequestService) peer.getService(MessageRequestService.NAME);
		Service messages = peer.getService(MessageService.NAME);
		
		messageSender.removeListener(who);
		messageSender.addListener(new ServiceListener() {
			
			@Override
			public void notify(Messages messages) {
				JsonTools<ArrayList<Message>> json = new JsonTools<>(new TypeReference<ArrayList<Message>>(){});
				ArrayList<Message> msgs = json.toEntity(messages.getMessage("messages"));
				System.out.println("messages found !");
				System.out.println(messages.getMessage("messages"));
				for(Message i : msgs) {
					System.out.println(i.getReceiver());
				}
				l.notify(json.toEntity(messages.getMessage("messages")));
			}
			
		}, who == null ? "test":who);
		
		messages.search(attribute, value, new SearchListener<MessageAdvertisementInterface>() {
			@Override
			public void notify(Collection<MessageAdvertisementInterface> result) {
				ArrayList<String> uids = new ArrayList<>();
				for(MessageAdvertisementInterface i: result) {
					uids.add(i.getSourceURI());
				}
				messageSender.sendRequest(value, who == null ? "test":who, uids.toArray(new String[1]));
			}
			
		});
	}

	@Override
	public void findOneByAttribute(String attribute, String value, ManagerListener<Message> l) {
		super.findOneByAttribute(attribute, value, l);
		//TODO
	}

	@Override
	public void persist(Message entity) {
		super.persist(entity);
		MessageAdvertisementInterface iadv = AdvertisementFactory.createMessageAdvertisement();
		iadv.publish(peer);
	}

	@Override
	public void begin() {
		super.begin();
	}

	@Override
	public void end() {
		super.end();
	}
	
}