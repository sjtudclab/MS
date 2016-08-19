package org.dclab.model;

public class TopicBean {
	private int topicId;
	private int num;
	private String content;
	private int typeId;
	private String paperNum;
	private String points;
	private String correctAnswer;
	
	
	
	
	public TopicBean() {
		super();
	}
	public TopicBean(int num, String content, int typeId, String paperNum, String points) {
		super();
		this.num = num;
		this.content = content;
		this.typeId = typeId;
		this.paperNum = paperNum;
		this.points = points;
	}
	public int getTopicId() {
		return topicId;
	}
	public void setTopicId(int topicId) {
		this.topicId = topicId;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getTypeId() {
		return typeId;
	}
	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}
	public String getPaperNum() {
		return paperNum;
	}
	public void setPaperNum(String paperNum) {
		this.paperNum = paperNum;
	}
	public String getPoints() {
		return points;
	}
	public void setPoints(String points) {
		this.points = points;
	}
	public String getCorrectAnswer() {
		return correctAnswer;
	}
	public void setCorrectAnswer(String correctAnswer) {
		this.correctAnswer = correctAnswer;
	}
	
	
}
