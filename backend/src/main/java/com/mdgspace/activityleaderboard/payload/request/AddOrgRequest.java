package com.mdgspace.activityleaderboard.payload.request;

import java.io.Serializable;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AddOrgRequest implements Serializable {
    
    @NotBlank
    @Size(min=3,max=15)
    private String name;

    @Size(min=5, max=30)
    private String description;
}
