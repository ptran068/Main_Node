import Joi from 'joi';

const member = Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i);


exports.createGroup = {
    body: {
        name: Joi.string().required().min(2).max(255),
       
        members: Joi.array().items(member),
        lastMessage: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    
    },
    params: {
        id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    },
    query: {
        page: Joi.number().min(1).max(100),
        limit: Joi.number().min(1).max(100)
    }
};

exports.updateGroup = {
    body: {
        name: Joi.string().min(2).max(255),
        lastMessage: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
        
    },
    params: {
    	id: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    },
    query: {
    	
    }
};

