package org.dclab.mapping;

import org.apache.ibatis.annotations.Update;

public interface TopicMapperI {
	@Update("UPDATE topic SET correctAnswer=#{correctAnswer}")
	public int updateAnswer(String correctAnswer);
}
